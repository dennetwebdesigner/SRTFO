const storage = `${import.meta.env.VITE_HOST_SERVER}static/teams/`;

export function resolve_img(name: string) {
  const key = name.split(" ").join("_").toLowerCase();
  return storage + key + ".png";
}
