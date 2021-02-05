interface Point {
  lat: number;
  lon: number;
}

interface Bounds {
  sw: Point;
  ne: Point;
}

interface ObjectElement {
  type: string;
  coordinates: number[];
}

export interface BasedResult {
  ok: boolean;
  elapsed: string;
}

/*
|--------------------------------------------------------------------------
| Connection
|--------------------------------------------------------------------------
*/
export interface PingResult extends BasedResult {
  ping: string;
}

type TestType = 'bounds' | 'circle' | 'get' | 'hash' | 'object' | 'point' | 'quadkey' | 'tile';
export interface TestOption {
  a: [TestType, ...unknown[]];
  b: [TestType, ...unknown[]];
  type: 'intersects' | 'within';
  clip?: boolean;
}

export interface TestResult extends BasedResult {
  result: boolean;
}

/*
|--------------------------------------------------------------------------
| Keys
|--------------------------------------------------------------------------
*/
export interface BoundsResult extends BasedResult {
  bounds: { type: string; coordinates: Array<Array<number[]>> };
}

export interface FGetOption {
  key: string;
  id: string;
  xx?: boolean;
  fields: Record<string, number>;
}

export interface GetOption {
  key: string;
  id: string;
  type?: 'OBJECT' | 'POINT' | 'BOUNDS' | 'HASH';
  withFields?: boolean;
  precision?: number;
}

export interface GetResult extends BasedResult {
  fields?: Record<string, number>;
  hash?: string;
  point?: Point;
  bounds?: Bounds;
  object?: ObjectElement;
}

export interface JGetResult extends BasedResult {
  value: string;
}

export interface KeysResult extends BasedResult {
  keys: string[];
}

export interface SetOption {
  key: string;
  id: string;
  ex?: number;
  nx?: boolean;
  xx?: boolean;
  fields?: Record<string, number>;
  point?: [number, number, number?];
  bounds?: [number, number, number, number];
  hash?: string;
  object?: string;
  string?: string;
}

export interface StatsResult extends BasedResult {
  stats: Array<null | {
    in_memory_size: number;
    num_objects: number;
    num_points: number;
    num_strings: number;
  }>;
}

export interface TTLResult extends BasedResult {
  ttl: number;
}

/*
|--------------------------------------------------------------------------
| Replication
|--------------------------------------------------------------------------
*/
export interface Aofmd5Result extends BasedResult {
  md5: string;
}

/*
|--------------------------------------------------------------------------
| Scripting
|--------------------------------------------------------------------------
*/
export interface EvalResult extends BasedResult {
  result: any;
}

export interface ScriptLoadResult extends BasedResult {
  result: string;
}

export interface ScriptExistsResult extends BasedResult {
  result: number[];
}

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/
export interface ConfigGetResult extends BasedResult {
  properties: {
    autogc: string;
    keepalive: string;
    leaderauth: string;
    maxmemory: string;
    'protected-mode': string;
    requirepass: string;
  };
}

export interface ServerResult extends BasedResult {
  stats: {
    aof_size: number;
    avg_item_size: number;
    cpus: number;
    heap_released: number;
    heap_size: number;
    http_transport: boolean;
    id: string;
    in_memory_size: number;
    max_heap_size: number;
    mem_alloc: number;
    num_collections: number;
    num_hooks: number;
    num_objects: number;
    num_points: number;
    num_strings: number;
    pid: number;
    pointer_size: number;
    read_only: boolean;
    threads: number;
    version: string;
  };
}

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/
type SearchBounds = { minlat: number; minlon: number; maxlat: number; maxlon: number };
type SearchCommand = 'del' | 'drop' | 'set';
type SearchDetect = 'inside' | 'outside' | 'enter' | 'exit' | 'cross';
type SearchGet = { key: string; id: string };
type SearchOrder = 'asc' | 'desc';
type SearchOutput = 'count' | 'ids' | 'objects' | 'points' | 'bounds' | 'hashes';
type SearchPoint = { lat: number; lon: number; meters?: number };
type SearchTile = { x: number; y: number; zoom: number };
type SearchWhere = { [key: string]: { min: SearchWhereValue; max: SearchWhereValue } };
type SearchWhereEval = [string, ...number[]];
type SearchWhereIn = { [key: string]: number[] };
type SearchWhereValue = number | '-inf' | '+inf';

export interface IntersectsOption {
  key: string;
  output?: SearchOutput;
  precision?: number;

  cursor?: number;
  limit?: number;
  sparse?: number;
  match?: string;
  where?: SearchWhere;
  whereIn?: SearchWhereIn;
  whereEval?: SearchWhereEval;
  whereEvalSha?: SearchWhereEval;
  clip?: boolean;
  noFields?: boolean;
  fence?: boolean;
  nodWell?: boolean;
  detect?: SearchDetect[];
  commands?: SearchCommand[];

  get?: SearchGet;
  bounds?: SearchBounds;
  circle?: SearchPoint;
  hash?: string;
  object?: Record<string, unknown>;
  quadkey?: string;
  tile?: SearchTile;
}

export interface NearbyOption {
  key: string;
  output?: SearchOutput;
  precision?: number;

  cursor?: number;
  limit?: number;
  sparse?: number;
  match?: string;
  distance?: boolean;
  where?: SearchWhere;
  whereIn?: SearchWhereIn;
  whereEval?: SearchWhereEval;
  whereEvalSha?: SearchWhereEval;
  noFields?: boolean;
  fence?: boolean;
  nodWell?: boolean;
  detect?: SearchDetect[];
  commands?: SearchCommand[];

  point?: SearchPoint;
  roam?: { key: string; pattern: string; meters: number };
}

export interface ScanOption {
  key: string;
  output?: SearchOutput;
  precision?: number;

  cursor?: number;
  limit?: number;
  match?: string;
  order?: SearchOrder;
  where?: SearchWhere;
  whereIn?: SearchWhereIn;
  whereEval?: SearchWhereEval;
  whereEvalSha?: SearchWhereEval;
  noFields?: boolean;
}

export interface SearchOption {
  key: string;
  cursor?: number;
  limit?: number;
  match?: string;
  order?: SearchOrder;
  where?: SearchWhere;
  whereIn?: SearchWhereIn;
  whereEval?: SearchWhereEval;
  whereEvalSha?: SearchWhereEval;
  noFields?: boolean;
  output?: Extract<SearchOutput, 'ids' | 'count'>;
}

export interface WithinOption {
  key: string;
  output?: SearchOutput;
  precision?: number;

  cursor?: number;
  limit?: number;
  sparse?: number;
  match?: string;
  where?: SearchWhere;
  whereIn?: SearchWhereIn;
  whereEval?: SearchWhereEval;
  whereEvalSha?: SearchWhereEval;
  noFields?: boolean;
  fence?: boolean;
  nodWell?: boolean;
  detect?: SearchDetect[];
  commands?: SearchCommand[];

  get?: SearchGet;
  bounds?: SearchBounds;
  circle?: SearchPoint;
  tile?: SearchTile;
  object?: Record<string, unknown>;
  quadkey?: string;
  hash?: string;
}

export type FilterOption = IntersectsOption & NearbyOption & ScanOption & WithinOption;

export interface FilterResult extends BasedResult {
  count: number;
  cursor: number;
  fields?: string[];
  ids?: string[];
  bounds?: Array<{ id: string; distance?: number; fields?: number[]; bounds: Bounds }>;
  hashes?: Array<{ id: string; distance?: number; fields?: number[]; hash: string }>;
  points?: Array<{ id: string; distance?: number; fields?: number[]; point: Point }>;
  objects?: Array<{ id: string; distance?: number; fields?: number[]; object: ObjectElement }>;
}

/*
|--------------------------------------------------------------------------
| Channels
|--------------------------------------------------------------------------
*/
export interface SetChanOption extends FilterOption {
  name: string;
  meta?: Record<string, string>;
  ex?: number;
  type: 'intersects' | 'nearby' | 'within';
}

interface SubscribeResult extends GetResult {
  key: string;
  id: string;
  time: Date;
  command?: SearchCommand;
  detect?: SearchDetect;
  group?: string;
  hook?: string;
  meta?: Record<string, any>;
}

export type PSubscribeCallback = (pattern: string, channel: string, data: SubscribeResult) => void;
export type SubscribeCallback = (channel: string, data: SubscribeResult) => void;

/*
|--------------------------------------------------------------------------
| Webhooks
|--------------------------------------------------------------------------
*/
export interface HooksResult extends BasedResult {
  hooks: string[];
}

export interface SetHookOption extends FilterOption {
  name: string;
  endpoint: string;
  meta?: Record<string, string>;
  ex?: number;
  type: 'intersects' | 'nearby' | 'within';
}
