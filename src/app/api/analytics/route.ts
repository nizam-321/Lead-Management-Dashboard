import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Lead } from '@/models/Lead';

export async function GET() {
  try {
    await dbConnect();

    const data = await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0
        }
      }
    ]);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}