import { APP_CONFIG } from "@/config/app";

export type ParamKind = "path" | "query";

export interface ApiParam {
  name: string;
  kind: ParamKind;
  type: string;
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface ApiEndpoint {
  id: string;
  group: string;
  name: string;
  method: "GET";
  path: string;
  description: string;
  params: ApiParam[];
}

const BASE_URL = APP_CONFIG.api.baseUrl;

export const endpoints: ApiEndpoint[] = [
  {
    id: "home",
    group: "Home",
    name: "Home",
    method: "GET",
    path: "/home",
    description:
      "Mengambil data halaman utama yang hero section banner, anime ongoing, completed, dan random anime.",
    params: [],
  },
  {
    id: "anime-list",
    group: "Anime",
    name: "Anime List",
    method: "GET",
    path: "/anime",
    description:
      "Mengambil seluruh daftar anime berdasarkan urutan alfabet.",
    params: [],
  },
  {
    id: "anime-detail",
    group: "Anime",
    name: "Anime Detail",
    method: "GET",
    path: "/anime/:slug",
    description:
      "Mengambil informasi lengkap sebuah anime seperti sinopsis, genre, dan episode.",
    params: [
      {
        name: "slug",
        kind: "path",
        type: "string",
        required: true,
        description: "Anime slug.",
        placeholder: "amagami-chi-sub-indo",
        defaultValue: "amagami-chi-sub-indo",
      },
    ],
  },
  {
    id: "search",
    group: "Anime",
    name: "Search Anime",
    method: "GET",
    path: "/search",
    description:
      "Mencari anime berdasarkan keyword (kata kunci).",
    params: [
      {
        name: "keyword",
        kind: "query",
        type: "string",
        required: true,
        description: "Kata kunci pencarian.",
        placeholder: "2.5",
        defaultValue: "2.5",
      },
    ],
  },
  {
    id: "genres",
    group: "Genres",
    name: "Genre List",
    method: "GET",
    path: "/genres",
    description:
      "Mengambil seluruh daftar genre anime.",
    params: [],
  },
  {
    id: "genre-anime",
    group: "Genres",
    name: "Anime by Genre",
    method: "GET",
    path: "/genres/:slug",
    description:
      "Mengambil daftar anime berdasarkan genre tertentu. Mendukung pagination.",
    params: [
      {
        name: "slug",
        kind: "path",
        type: "string",
        required: true,
        description: "Genre slug.",
        placeholder: "romance",
        defaultValue: "romance",
      },
      {
        name: "page",
        kind: "query",
        type: "integer",
        required: false,
        description: "Nomor halaman.",
        placeholder: "2",
        defaultValue: "2",
      },
    ],
  },
  {
    id: "stream",
    group: "Streaming",
    name: "Episode Stream",
    method: "GET",
    path: "/stream/:episodeId",
    description:
      "Mengambil informasi streaming episode, server yang tersedia, URL default, dan navigasi episode.",
    params: [
      {
        name: "episodeId",
        kind: "path",
        type: "string",
        required: true,
        description: "Episode ID.",
        placeholder: "ascne-episode-11-sub-indo",
        defaultValue: "ascne-episode-11-sub-indo",
      },
    ],
  },
  {
    id: "stream-server",
    group: "Streaming",
    name: "Streaming Server",
    method: "GET",
    path: "/stream/server/:serverId",
    description:
      "Mengambil URL streaming dari server yang dipilih tanpa memuat ulang seluruh data episode.",
    params: [
      {
        name: "serverId",
        kind: "path",
        type: "string",
        required: true,
        description: "Streaming server ID.",
        placeholder: "6D59DE-5-C75u",
        defaultValue: "6D59DE-5-C75u",
      },
    ],
  },
];

export function buildUrl(
  endpoint: ApiEndpoint,
  values: Record<string, string>,
): string {
  let path = endpoint.path;
  const query = new URLSearchParams();

  for (const param of endpoint.params) {
    const value = values[param.name]?.trim() ?? "";

    if (param.kind === "path") {
      path = path.replace(
        `:${param.name}`,
        encodeURIComponent(value),
      );
    } else if (value) {
      query.set(param.name, value);
    }
  }

  const qs = query.toString();

  return `${BASE_URL}${path}${qs ? `?${qs}` : ""}`;
}