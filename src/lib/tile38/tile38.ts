import * as Redis from 'ioredis';

import * as I from './tile38.interfaces';

export class Tile38 {
  constructor(readonly redis: Redis.Redis) {
    this.output('json').catch(err =>
      console.warn(`unable to set output mode to json: ${err.message}`)
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Channels
  |--------------------------------------------------------------------------
  */

  /**
   * Finds all channels matching a pattern
   * @see https://tile38.com/commands/chans
   */
  chans(pattern: string) {
    return this.sendCommand('CHANS', [pattern]);
  }

  /**
   * Removes a channel
   * @see https://tile38.com/commands/delchan
   */
  delchan(name: string) {
    return this.sendCommand('DELCHAN', [name]);
  }

  /**
   * Removes all channels matching a pattern
   * @see https://tile38.com/commands/pdelchan
   */
  pdelchan(pattern: string) {
    return this.sendCommand('PDELCHAN', [pattern]);
  }

  /**
   * Subscribes the client to the given patterns
   * @see https://tile38.com/commands/psubscribe
   */
  psubscribe(channels: string[], callback: I.PSubscribeCallback) {
    const sub = this.redis.duplicate();
    sub.on('pmessage', callback);
    sub.psubscribe(...channels);
    return sub;
  }

  /**
   * Creates a pubsub channel which points to geofenced search
   * @see https://tile38.com/commands/setchan
   */
  setchan(opt: I.SetChanOption) {
    const { name, meta, ex, type, ...rest } = opt;

    const args: any[] = [name];
    if (meta) Object.entries(meta).forEach(([k, v]) => args.push('META', k, v));
    if (ex) args.push('EX', ex);
    if (type) args.push(type);
    const filters = this.filter({ ...rest, fence: true });
    return this.sendCommand('SETCHAN', [...args, ...filters]);
  }

  /**
   * Subscribe to a geofence channel
   * @see https://tile38.com/commands/subscribe
   */
  subscribe(channels: string[], callback: I.SubscribeCallback) {
    const sub = this.redis.duplicate();
    sub.on('message', callback);
    sub.subscribe(...channels);
    return sub;
  }

  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  */

  /**
   * Authenticate to the server
   * @see https://tile38.com/commands/auth
   */
  auth(password: string) {
    return this.sendCommand('AUTH', [password]);
  }

  /**
   * Gets or sets the output format for the current connection
   * @see https://tile38.com/commands/output
   */
  output(format: 'json' | 'resp') {
    return this.sendCommand('OUTPUT', [format]);
  }

  /**
   * Ping the server
   * @see https://tile38.com/commands/ping
   */
  ping() {
    return this.sendCommand<I.PingResult>('PING');
  }

  /**
   * Close the connection
   * @see https://tile38.com/commands/quit
   */
  quit() {
    return this.sendCommand('QUIT');
  }

  /**
   * Performs spatial test
   * @see https://tile38.com/commands/test
   */
  test(opt: I.TestOption) {
    const { a, b, type, clip = null } = opt;
    const args = [...a, type];
    if (clip) args.push('CLIP');
    return this.sendCommand<I.TestResult>('TEST', [...args, ...b]);
  }

  /**
   * TODO: Runs the following command with the timeout
   * @see https://tile38.com/commands/timeout
   */
  timeout(second: number) {
    return second;
  }

  /*
  |--------------------------------------------------------------------------
  | Keys
  |--------------------------------------------------------------------------
  */

  /**
   * Get the combined bounds of all the objects in a key
   * @see https://tile38.com/commands/bounds
   */
  bounds(key: string) {
    return this.sendCommand<I.BoundsResult>('BOUNDS', [key]);
  }

  /**
   * Delete an id from a key
   * @see https://tile38.com/commands/del
   */
  del(key: string, id: string) {
    return this.sendCommand('DEL', [key, id]);
  }

  /**
   * Remove a key from the database
   * @see https://tile38.com/commands/drop
   */
  drop(key: string) {
    return this.sendCommand('DROP', [key]);
  }

  /**
   * Set a timeout on an id
   * @see https://tile38.com/commands/expire
   */
  expire(key: string, id: string, timeout: number) {
    return this.sendCommand('EXPIRE', [key, id, timeout]);
  }

  /**
   * Set the value for one or more fields of an id
   * @see https://tile38.com/commands/fset
   */
  fset(opt: I.FGetOption) {
    const { key, id, fields, xx } = opt;
    const args: any[] = [key, id];
    if (xx) args.push('XX');
    if (fields) Object.entries(fields).forEach(([k, v]) => args.push(k, v));
    return this.sendCommand('FSET', args);
  }

  /**
   * Get the object of an id
   * @see https://tile38.com/commands/get
   */
  get(option: I.GetOption) {
    const { key, id, type, precision, withFields } = option;
    const args: any[] = [key, id];

    if (withFields) args.push('WITHFIELDS');
    if (type) args.push(type);
    if (precision) args.push(precision);

    return this.sendCommand<I.GetResult>('GET', args);
  }

  /**
   * Delete a value from a JSON document
   * @see https://tile38.com/commands/jdel
   */
  jdel(key: string, id: string, path: string) {
    return this.sendCommand<I.JGetResult>('JDEL', [key, id, path]);
  }

  /**
   * Get a value from a JSON document
   * @see https://tile38.com/commands/jget
   */
  jget(key: string, id: string, path?: string, opt?: 'RAW') {
    const args: any[] = [key, id];
    if (path) args.push(path);
    if (opt) args.push(opt);
    return this.sendCommand<I.JGetResult>('JGET', args);
  }

  /**
   * Set a value in a JSON document
   * @see https://tile38.com/commands/jset
   */
  jset(key: string, id: string, path: string, value: any, opt?: 'RAW' | 'STR') {
    const args: any[] = [key, id, path, value];
    if (opt) args.push(opt);
    return this.sendCommand('JSET', args);
  }

  /**
   * Finds all keys matching the given pattern
   * @see https://tile38.com/commands/keys
   */
  keys(pattern: string) {
    return this.sendCommand<I.KeysResult>('KEYS', [pattern]);
  }

  /**
   * Removes all objects matching a pattern
   * @see https://tile38.com/commands/pdel
   */
  pdel(key: string, pattern: string) {
    return this.sendCommand('PDEL', [key, pattern]);
  }

  /**
   * Remove the existing timeout on an id
   * @see https://tile38.com/commands/persist
   */
  persist(key: string, id: string) {
    return this.sendCommand('PERSIST', [key, id]);
  }

  /**
   * Rename a key to be stored under a different name.
   * @see https://tile38.com/commands/rename
   */
  rename(key: string, newKey: string) {
    return this.sendCommand('RENAME', [key, newKey]);
  }

  /**
   * Rename a key to be stored under a different name, if a new key does not exist.
   * @see https://tile38.com/commands/renamenx
   */
  renamenx(key: string, newKey: string) {
    return this.sendCommand('RENAMENX', [key, newKey]);
  }

  /**
   * Sets the value of an id
   * @see https://tile38.com/commands/set
   */
  set(opt: I.SetOption) {
    const args: any[] = [opt.key, opt.id];

    if (opt.fields) Object.entries(opt.fields).forEach(([k, v]) => args.push('FIELD', k, v));
    if (opt.ex) args.push('EX', opt.ex);
    if (opt.nx) args.push('NX');
    if (opt.xx) args.push('XX');
    if (opt.point) args.push('POINT', ...(opt.point as number[]));
    if (opt.bounds) args.push('BOUNDS', ...(opt.bounds as number[]));
    if (opt.hash) args.push('HASH', opt.hash);
    if (opt.object) args.push('OBJECT', opt.object);
    if (opt.string) args.push('STRING', `"${opt.string}"`);

    return this.sendCommand('SET', args);
  }

  /**
   * Show stats for one or more keys
   * @see https://tile38.com/commands/stats
   */
  stats(...keys: string[]) {
    return this.sendCommand<I.StatsResult>('STATS', keys);
  }

  /**
   * Get a timeout on an id
   * @see https://tile38.com/commands/ttl
   */
  ttl(key: string, id: string) {
    return this.sendCommand<I.TTLResult>('TTL', [key, id]);
  }

  /*
  |--------------------------------------------------------------------------
  | Replication
  |--------------------------------------------------------------------------
  */

  /**
   * Downloads the AOF starting from pos and keeps the connection alive
   * @see https://tile38.com/commands/aof
   */
  aof(pos: number) {
    return this.sendCommand('AOF', [pos]);
  }

  /**
   * Performs a checksum on a portion of the aof
   * @see https://tile38.com/commands/aofmd5
   */
  aofmd5(pos: number, size: number) {
    return this.sendCommand<I.Aofmd5Result>('AOFMD5', [pos, size]);
  }

  /**
   * Shrinks the aof in the background
   * @see https://tile38.com/commands/aofshrink
   */
  aofshrink() {
    return this.sendCommand('AOFSHRINK');
  }

  /**
   * Follows a leader host
   * @see https://tile38.com/commands/follow
   */
  follow(host: string, port: string) {
    return this.sendCommand('FOLLOW', [host, port]);
  }

  /*
  |--------------------------------------------------------------------------
  | Scripting
  |--------------------------------------------------------------------------
  */

  /**
   * Evaluates a Lua script
   * @see https://tile38.com/commands/eval
   */
  eval(script: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVAL', [script, numkeys, ...keysAndArgs]);
  }

  /**
   * Evaluates a Lua script in a non-atomic fashion
   * @see https://tile38.com/commands/evalna
   */
  evalna(script: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVALNA', [script, numkeys, ...keysAndArgs]);
  }

  /**
   * Evaluates, in a non-atomic fashion, a Lua script cached on the server by its SHA1 digest
   * @see https://tile38.com/commands/evalnasha
   */
  evalnasha(script: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVALNASHA', [script, numkeys, ...keysAndArgs]);
  }

  /**
   * Evaluates a read-only Lua script
   * @see https://tile38.com/commands/evalro
   */
  evalro(script: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVALRO', [script, numkeys, ...keysAndArgs]);
  }

  /**
   * Evaluates a read-only Lua script cached on the server by its SHA1 digest
   * @see https://tile38.com/commands/evalrosha
   */
  evalrosha(script: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVALROSHA', [script, numkeys, ...keysAndArgs]);
  }

  /**
   * Evaluates a Lua script cached on the server by its SHA1 digest
   * @see https://tile38.com/commands/evalsha
   */
  evalsha(sha1: string, numkeys: number, ...keysAndArgs: (string | number)[]) {
    return this.sendCommand<I.EvalResult>('EVALSHA', [sha1, numkeys, ...keysAndArgs]);
  }

  /**
   * Returns information about the existence of the scripts in server cache
   * @see https://tile38.com/commands/script-exists
   */
  scriptExists(...sha1: string[]) {
    return this.sendCommand<I.ScriptExistsResult>('SCRIPT', ['EXISTS', ...sha1]);
  }

  /**
   * Loads the compiled version of a script into the server cache, without executing
   * @see https://tile38.com/commands/script-load
   */
  scriptLoad(script: string) {
    return this.sendCommand<I.ScriptLoadResult>('SCRIPT', ['LOAD', script]);
  }

  /**
   * Flushes the server cache of Lua scripts
   * @see https://tile38.com/commands/script-flush
   */
  scriptFlush() {
    return this.sendCommand('SCRIPT', ['FLUSH']);
  }

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  /**
   * Searches for ids that intersect an area
   * @see https://tile38.com/commands/intersects
   */
  intersects(opt: I.IntersectsOption) {
    return this.sendCommand<I.FilterResult>('INTERSECTS', this.filter(opt as any));
  }

  /**
   * Searches for ids that are nearby a point
   * @see https://tile38.com/commands/nearby
   */
  nearby(opt: I.NearbyOption) {
    return this.sendCommand<I.FilterResult>('NEARBY', this.filter(opt as any));
  }

  /**
   * Incrementally iterate though a key
   * @see https://tile38.com/commands/scan
   */
  scan(opt: I.ScanOption) {
    return this.sendCommand<I.FilterResult>('SCAN', this.filter(opt as any));
  }

  /**
   * Search for string values in a key
   * @see https://tile38.com/commands/search
   */
  search(opt: I.SearchOption) {
    return this.sendCommand<I.FilterResult>('SEARCH', this.filter(opt as any));
  }

  /**
   * Searches for ids that completely within the area
   * @see https://tile38.com/commands/within
   */
  within(opt: I.WithinOption) {
    return this.sendCommand<I.FilterResult>('WITHIN', this.filter(opt as any));
  }

  /*
  |--------------------------------------------------------------------------
  | Server
  |--------------------------------------------------------------------------
  */

  /**
   * Get the value of a configuration parameter
   * @see https://tile38.com/commands/config-get
   */
  configGet(parameter = '*') {
    return this.sendCommand<I.ConfigGetResult>('CONFIG', ['GET', parameter]);
  }

  /**
   * Rewrite the configuration file with the in memory configuration
   * @see https://tile38.com/commands/config-rewrite
   */
  configRewrite() {
    return this.sendCommand('CONFIG', ['REWRITE']);
  }

  /**
   * Set a configuration parameter to the given value
   * @see https://tile38.com/commands/config-set
   */
  configSet(parameter: string, value?: string) {
    const args = [parameter];
    if (value) args.push(value);
    return this.sendCommand('CONFIG', ['SET', ...args]);
  }

  /**
   * Removes all keys
   * @see https://tile38.com/commands/flushdb
   */
  flushDB() {
    return this.sendCommand('FLUSHDB');
  }

  /**
   * Forces a garbage collection
   * @see https://tile38.com/commands/gc
   */
  gc() {
    return this.sendCommand('GC');
  }

  /**
   * Turns on or off readonly mode
   * @see https://tile38.com/commands/readonly
   */
  readonly(isRead: boolean) {
    return this.sendCommand('READONLY', [isRead ? 'yes' : 'no']);
  }

  /**
   * Show server stats and details
   * @see https://tile38.com/commands/server
   */
  server() {
    return this.sendCommand<I.ServerResult>('SERVER');
  }

  /*
  |--------------------------------------------------------------------------
  | Webhooks
  |--------------------------------------------------------------------------
  */

  /**
   * Removes a webhook
   * @see https://tile38.com/commands/delhook
   */
  delhook(name: string) {
    return this.sendCommand('DELHOOK', [name]);
  }

  /**
   * Finds all hooks matching a pattern
   * @see https://tile38.com/commands/hooks
   */
  hooks(pattern: string) {
    return this.sendCommand<I.HooksResult>('HOOKS', [pattern]);
  }

  /**
   * Removes all hooks matching a pattern
   * @see https://tile38.com/commands/pdelhook
   */
  pdelhook(pattern: string) {
    return this.sendCommand('PDELHOOK', [pattern]);
  }

  /**
   * Creates a webhook which points to geofenced search
   * @see https://tile38.com/commands/sethook
   */
  sethook(opt: I.SetHookOption) {
    const { name, endpoint, meta, ex, type, ...rest } = opt;

    const args: any[] = [name, endpoint];
    if (meta) Object.entries(meta).forEach(([k, v]) => args.push('META', k, v));
    if (ex) args.push('EX', ex);
    if (type) args.push(type);
    const filters = this.filter({ ...rest, fence: true });
    return this.sendCommand('SETHOOK', [...args, ...filters]);
  }

  /*
  |--------------------------------------------------------------------------
  | Helper methods
  |--------------------------------------------------------------------------
  */

  /**
   * ! DO NOT CHANGE THE ORDER OF CONDITIONS
   */
  private filter(opt: I.FilterOption) {
    const args: any[] = [opt.key];

    // Filter Format
    // ------------------
    if (opt.cursor) args.push('CURSOR', opt.cursor);
    if (opt.limit) args.push('LIMIT', opt.limit);
    if (opt.sparse) args.push('SPARSE', opt.sparse);
    if (opt.match) args.push('MATCH', opt.match);
    if (opt.distance) args.push('DISTANCE');
    if (opt.order) args.push(opt.order);
    if (opt.where)
      Object.entries(opt.where).forEach(([k, v]) => args.push('WHERE', k, v.min, v.max));
    if (opt.whereIn)
      Object.entries(opt.whereIn).forEach(([k, v]) => args.push('WHEREIN', k, v.length, ...v));
    if (opt.whereEval) this.whereEval('WHEREEVAL', opt.whereEval);
    if (opt.whereEvalSha) this.whereEval('WHEREEVALSHA', opt.whereEvalSha);
    if (opt.clip) args.push('CLIP');
    if (opt.noFields) args.push('NOFIELDS');
    if (opt.fence) args.push('FENCE');
    if (opt.nodWell) args.push('NODWELL');
    if (opt.commands) args.push('COMMANDS', opt.commands.join(','));

    if (opt.detect) args.push('DETECT', opt.detect.join(','));

    // Output Format
    // ------------------
    if (opt.output) args.push(opt.output);
    if (opt.precision) args.push(opt.precision);

    // Area Format Option
    // ------------------
    if (opt.get) args.push('GET', opt.get.key, opt.get.id);
    if (opt.bounds)
      args.push(
        'BOUNDS',
        opt.bounds.minlat,
        opt.bounds.minlon,
        opt.bounds.maxlat,
        opt.bounds.maxlon
      );
    if (opt.object) args.push('OBJECT', JSON.stringify(opt.object));
    if (opt.circle) args.push('CIRCLE', opt.circle.lat, opt.circle.lon, opt.circle.meters);
    if (opt.tile) args.push('TILE', opt.tile.x, opt.tile.y, opt.tile.zoom);
    if (opt.quadkey) args.push('QUADKEY', opt.quadkey);
    if (opt.hash) args.push('HASH', opt.hash);
    if (opt.point) args.push('POINT', opt.point.lat, opt.point.lon, opt.point.meters);
    if (opt.roam) args.push('ROAM', opt.roam.key, opt.roam.pattern, opt.roam.meters);

    return args;
  }

  private whereEval(command: string, params: [string, ...number[]]) {
    const [script, ...args] = params;
    return [command, script, args.length, ...args];
  }

  private async sendCommand<T extends I.BasedResult>(
    command: string,
    args: any[] = []
  ): Promise<T> {
    console.log(`SendCommand: ${command} ${args.join(' ')}`);
    const result = (await this.redis.send_command(command, args).then(x => JSON.parse(x))) as T;
    if (!result.ok) throw new Error((result as any).err);
    return result;
  }
}
