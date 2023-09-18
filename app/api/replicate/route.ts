import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PROMPTS } from "@/config/tables";

import replicate, { SDXL_MODEL } from "@/libs/replicate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const params = await req.json();
  const response = await replicate.run(SDXL_MODEL, {
    input: {
      ...params,
      num_inference_steps: 40,
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(TABLE_PROMPTS)
    .insert({
      user_id: user?.id,
      prompt: params?.prompt,
      seed: params?.seed,
      cfg: params?.guidance_scale,
      generated: response,
    })
    .select();

  console.log(data);
  return NextResponse.json(response);
}
