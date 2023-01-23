import { Magic } from "magic-sdk";
import { WebAuthnExtension } from "@magic-ext/webauthn";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
      extensions: [new WebAuthnExtension()],
    })
  );
};

export const magic = createMagic();
