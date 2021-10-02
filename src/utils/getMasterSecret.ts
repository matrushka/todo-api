const { MASTER_SECRET } = process.env;

export default function getMasterSecret() {
  if (!MASTER_SECRET) throw new Error("MASTER_SECRET environment variable not defined.");
  return MASTER_SECRET;
}
