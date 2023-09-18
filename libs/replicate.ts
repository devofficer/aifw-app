import Replicate from "replicate";

// export const SDXL_MODEL = "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82";
// export const SDXL_MODEL = "lucataco/realistic-vision-v5.1:2c8e954decbf70b7607a4414e5785ef9e4de4b8c51d50fb8b8b349160e0ef6bb";
export const SDXL_MODEL =
  "maison913/maison-cog-sdxl:06d1b3b4e9eed8ed0d62a317b441168d963b3edd4a9c47a290473db66a20e437";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY as string,
});

export default replicate;
