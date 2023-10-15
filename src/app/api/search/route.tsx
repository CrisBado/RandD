import { NextResponse } from "next/server";
import glossary  from "../../data/glossary.json"
export async function GET(request:any){
const {searchParams} = new URL (request.url);
const query:any = searchParams.get("q") || ""
const results = glossary.filter((x:any)=>x.word.toLowerCase().includes(query.toLowerCase()))

return NextResponse.json(results)
}
