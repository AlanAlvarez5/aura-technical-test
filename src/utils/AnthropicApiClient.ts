import Anthropic from '@anthropic-ai/sdk';

export interface MessageContent {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnthropicResponse {
  id: string;
  type: string;
  model: string;
  role: string;
  content: unknown[];
  stopReason: string | null;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export class AnthropicApiClient {
  private client: Anthropic;
  private defaultModel: string;
  private defaultMaxTokens: number;

  constructor(
    apiKey: string = import.meta.env.VITE_ANTHROPIC_API_KEY || '',
    model: string = 'claude-3-7-sonnet-20250219',
    maxTokens: number = 1024
  ) {
    this.client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    this.defaultModel = model;
    this.defaultMaxTokens = maxTokens;

    if (!apiKey) {
      console.warn('No API key provided for Anthropic. Client will not work properly.');
    }
  }

  async sendMessage(
    message: string,
    model: string = "claude-3-7-sonnet-20250219",
    maxTokens: number = 1024
  ): Promise<AnthropicResponse> {
    try {
      const response = await this.client.messages.create({
        model: model || this.defaultModel,
        max_tokens: maxTokens || this.defaultMaxTokens,
        messages: [
          {
            role: "user",
            content: message
          }
        ],
      });

      return {
        id: response.id,
        type: response.type,
        model: response.model,
        role: response.role,
        content: response.content,
        stopReason: response.stop_reason || null,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
      };
    } catch (error) {
      console.error('Error sending message to Anthropic:', error);
      throw error;
    }
  }

}

// Exportamos una instancia por defecto para facilitar su uso
export default new AnthropicApiClient();
