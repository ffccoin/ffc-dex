// Import necessary modules
import { NextResponse } from "next/server";
const axios = require("axios"); // Import axios if not already imported


// Define your named exports for the handlers
export async function getApproveSpender(req, res) {

  const url = "https://api.1inch.dev/swap/v6.0/1/approve/spender";

  try {
    const response = await axios.get(url);
    return NextResponse.json({ data: response.data });
  } catch (error) {
    return NextResponse.json({ message:error });
  }
}
export { getApproveSpender as GET };
