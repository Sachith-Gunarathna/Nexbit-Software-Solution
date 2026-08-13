import { NextResponse } from 'next/server';
import { subDays, startOfDay, format } from 'date-fns';

export const revalidate = 0;

// Firestore REST API — no Admin SDK needed (uses public API key)
// Works when Firestore security rules allow read access to 'licenses' collection,
// OR when Firebase Admin env vars are provided.
const PROJECT_ID = 'nexcentauri-pos-activations';
const FIRESTORE_REST_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

interface FirestoreDoc {
  fields: Record<string, any>;
  createTime?: string;
  updateTime?: string;
}

function extractField(field: any): any {
  if (!field) return null;
  if ('stringValue' in field) return field.stringValue;
  if ('booleanValue' in field) return field.booleanValue;
  if ('integerValue' in field) return parseInt(field.integerValue, 10);
  if ('doubleValue' in field) return field.doubleValue;
  if ('timestampValue' in field) return new Date(field.timestampValue);
  if ('nullValue' in field) return null;
  if ('mapValue' in field) {
    const map: Record<string, any> = {};
    for (const [k, v] of Object.entries(field.mapValue.fields || {})) {
      map[k] = extractField(v);
    }
    return map;
  }
  return null;
}

function docToObject(doc: FirestoreDoc): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of Object.entries(doc.fields || {})) {
    obj[key] = extractField(value);
  }
  // Attach timestamps from the doc metadata if activatedAt is missing
  if (!obj.activatedAt && doc.createTime) {
    obj._createTime = new Date(doc.createTime);
  }
  return obj;
}

async function fetchAllLicenses(): Promise<Record<string, any>[]> {
  const url = `${FIRESTORE_REST_BASE}/licenses?pageSize=300`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore REST error ${res.status}: ${text}`);
  }

  const data = await res.json();
  if (!data.documents) return [];

  return data.documents.map((doc: FirestoreDoc) => docToObject(doc));
}

export async function GET() {
  try {
    const licenses = await fetchAllLicenses();

    // Count active licenses (approved)
    const totalActive = licenses.filter(
      l => l.isActive === true && l.approvalStatus === 'approved'
    ).length;
    const totalPending = licenses.filter(l => l.approvalStatus === 'pending').length;
    const totalAll = licenses.length;

    // Edition breakdown (active approved only)
    const editionCounts = {
      basic: licenses.filter(l => l.edition === 'basic' && l.isActive && l.approvalStatus === 'approved').length,
      premium: licenses.filter(l => l.edition === 'premium' && l.isActive && l.approvalStatus === 'approved').length,
      deluxe: licenses.filter(l => l.edition === 'deluxe' && l.isActive && l.approvalStatus === 'approved').length,
    };

    // Shop category breakdown (active approved)
    const categories: Record<string, number> = {};
    licenses
      .filter(l => l.isActive && l.approvalStatus === 'approved')
      .forEach(l => {
        const cat = l.shopCategory || 'other';
        categories[cat] = (categories[cat] || 0) + 1;
      });

    // Last 7 days activations — based on activatedAt or createdAt or _createTime
    const last7Days: { date: string; activations: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const day = startOfDay(subDays(new Date(), i));
      const dayEnd = new Date(day.getTime() + 24 * 60 * 60 * 1000);
      const count = licenses.filter(l => {
        const ts: Date | null =
          l.activatedAt instanceof Date ? l.activatedAt :
          l.createdAt instanceof Date ? l.createdAt :
          l._createTime instanceof Date ? l._createTime : null;
        return ts && ts >= day && ts < dayEnd;
      }).length;
      last7Days.push({ date: format(day, 'MMM d'), activations: count });
    }

    return NextResponse.json({
      totalActive,
      totalPending,
      totalAll,
      editionCounts,
      categories,
      last7Days,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[pos-stats] Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch POS stats', details: error.message },
      { status: 500 }
    );
  }
}
