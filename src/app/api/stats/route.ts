import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function GET() {
  try {
    await dbConnect();

    const stats = await Lead.aggregate([
      {
        $group: {
          _id: null,
          totalLeads: { $sum: 1 },
          totalValue: { $sum: "$value" },
          closedWon: {
            $sum: { $cond: [{ $eq: ["$stage", "Closed Won"] }, 1, 0] },
          },
        },
      },
    ]);

    const result = stats[0] || { totalLeads: 0, totalValue: 0, closedWon: 0 };

    return NextResponse.json({
      totalLeads: result.totalLeads,
      totalValue: result.totalValue,
      closedWon: result.closedWon,
      conversionRate:
        result.totalLeads > 0
          ? ((result.closedWon / result.totalLeads) * 100).toFixed(1)
          : 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
