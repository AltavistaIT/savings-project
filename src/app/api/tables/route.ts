import {
  ErrorResponse,
  TablesGet200Response,
  TablesPost200Response,
} from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("user_id");
  const typeId = searchParams.get("type_id");
  const monthYear = searchParams.get("month_year");

  if (!userId || !typeId || !monthYear) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const result = await new InternalAPIClient().request<
    TablesGet200Response | ErrorResponse
  >(
    `/tables?user_id=${userId}&type_id=${typeId}&month_year=${monthYear}`,
    "GET"
  );

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);

  const result = await new InternalAPIClient().request<
    TablesPost200Response | ErrorResponse
  >("/tables", "POST", payload);
  return NextResponse.json(result);
}
