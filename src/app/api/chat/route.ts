
import { HfInference } from "@huggingface/inference"

const Hf = new HfInference(process.env.NEXT_HUGGINGFACE_API_KEY || "")

export const runtime = "edge"
 
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const prompt = messages && messages.length > 0 ? messages[messages.length - 1].content : "";

    const result = await Hf.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        repetition_penalty: 1,
        truncate: 1000,
        return_full_text: false,
      },
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("/api/chat error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}