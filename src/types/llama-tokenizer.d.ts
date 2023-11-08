declare module 'llama-tokenizer-js' {
  declare namespace LlamaTokenizer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function encode (prompt: string, add_bos_token?: boolean, add_preceding_space?: boolean, log_performance?: boolean): number[] | undefined
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function decode (tokens: number[], add_bos_token?: boolean, add_preceding_space?: boolean): string
  }
  export default LlamaTokenizer
}
