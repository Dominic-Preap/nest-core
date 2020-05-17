declare module 'node-media-server' {
  import { EventEmitter } from 'events';
  import { Socket } from 'socket.io';
  interface NodeMediaServerOptions {
    rtmp: {
      port: number;
      chunk_size: number;
      gop_cache: boolean;
      ping: number;
      ping_timeout: number;
    };
    http: {
      port: number;
      allow_origin: string;
    };
  }

  type ConnectEvent = 'preConnect' | 'postConnect' | 'doneConnect';
  type PublishEvent = 'prePublish' | 'postPublish' | 'donePublish';
  type PlayEvent = 'prePlay' | 'postPlay' | 'donePlay';
  interface GetSessionResults {
    reject(): void;
    config: NodeMediaServerOptions;
    socket: Socket;
    id: string;
    ip: string;
    TAG: string;
    handshakePayload: any;
    handshakeState: number;
    handshakeBytes: number;
    parserBuffer: Buffer;
    parserState: number;
    parserBytes: number;
    parserBasicBytes: number;
    // parserPacket:
    //  { header:
    //     { fmt: 3,
    //       cid: 3,
    //       timestamp: 0,
    //       length: 165,
    //       type: 20,
    //       stream_id: 0 },
    //    clock: 0,
    //    delta: 0,
    //    payload: <Buffer 02 00 07 63 6f 6e 6e 65 63 74 00 3f f0 00 00 00 00 00 00 03 00 03 61 70 70 02 00 03 78 78 78 00 04 74 79 70 65 02 00 0a 6e 6f 6e 70 72 69 76 61 74 65 ... >,
    //    capacity: 1189,
    //    bytes: 0 },
    // inPackets:
    //  Map {
    //    3 => { header: [Object],
    //    clock: 0,
    //    delta: 0,
    //    payload: <Buffer 02 00 07 63 6f 6e 6e 65 63 74 00 3f f0 00 00 00 00 00 00 03 00 03 61 70 70 02 00 03 78 78 78 00 04 74 79 70 65 02 00 0a 6e 6f 6e 70 72 69 76 61 74 65 ... >,
    //    capacity: 1189,
    //    bytes: 0 } },
    inChunkSize: number;
    outChunkSize: number;
    pingTime: number;
    pingTimeout: number;
    pingInterval: any;
    isIPC: boolean;
    isLocal: boolean;
    isStarting: boolean;
    isPublishing: boolean;
    isPlaying: boolean;
    isIdling: boolean;
    isPause: boolean;
    isFirstAudioReceived: boolean;
    isFirstVideoReceived: boolean;
    isReceiveAudio: boolean;
    isReceiveVideo: boolean;
    metaData: any;
    aacSequenceHeader: any;
    avcSequenceHeader: any;
    audioCodec: number;
    audioCodecName: string;
    audioProfileName: string;
    audioSamplerate: number;
    audioChannels: number;
    videoCodec: number;
    videoCodecName: string;
    videoProfileName: string;
    videoWidth: number;
    videoHeight: number;
    videoFps: number;
    videoLevel: number;
    gopCacheEnable: boolean;
    rtmpGopCacheQueue: any;
    flvGopCacheQueue: any;
    ackSize: number;
    inAckSize: number;
    inLastAck: number;
    appname: string;
    streams: number;
    playStreamId: number;
    playStreamPath: string;
    playArgs: any;
    publishStreamId: number;
    publishStreamPath: string;
    publishArgs: any;
    players: any;
  }

  class NodeMediaServer extends EventEmitter {
    constructor(opt: NodeMediaServerOptions);
    getSession(id: string): GetSessionResults;
    run(): void;
    stop(): void;
    on(
      event: ConnectEvent | PublishEvent | PlayEvent,
      listener: (id: string, StreamPath: string, args: any) => void
    ): this;
  }

  namespace NodeMediaServer {}

  export = NodeMediaServer;
}
