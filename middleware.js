import { NextResponse } from "next/server";

export const middleware = (req, ev) => {
  console.log({ req, ev });
  return NextResponse.next();
};
