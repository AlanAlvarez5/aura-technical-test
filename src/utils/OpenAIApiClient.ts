import OpenAI from "openai";

export interface MessageContent {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenAIResponse {
  id: string;
  model: string;
  outputText: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class OpenAIApiClient {
  private client: OpenAI;
  private defaultModel: string;

  constructor(
    apiKey: string = import.meta.env.VITE_OPEN_AI_API_KEY || '',
    model: string = "gpt-4o-mini"
  ) {
    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    this.defaultModel = model;

    if (!apiKey) {
      console.warn('No API key provided for OpenAI. Client will not work properly.');
    }
  }

  async generateText(
    prompt: string,
    model?: string
  ): Promise<OpenAIResponse> {
    try {
      const response = await this.client.responses.create({
        model: model ?? this.defaultModel,
        input: prompt,
      });

      return {
        id: response.id,
        model: response.model,
        outputText: response.output_text
      };
    } catch (error) {
      console.error('Error generating text with OpenAI:', error);
      throw error;
    }
  }

  async createChatCompletion(
    messages: MessageContent[],
    model?: string
  ): Promise<OpenAIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: model || this.defaultModel,
        messages: messages,
      });

      return {
        id: response.id,
        model: response.model,
        outputText: response.choices[0]?.message?.content || '',
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens,
        } : undefined,
      };
    } catch (error) {
      console.error('Error creating chat completion with OpenAI:', error);
      throw error;
    }
  }

  async ask(
    question: string,
    model?: string
  ): Promise<OpenAIResponse> {
    return this.createChatCompletion(
      [{ role: 'user', content: question }],
      model
    );
  }

  async continueConversation(
    conversationHistory: MessageContent[],
    model?: string
  ): Promise<OpenAIResponse> {
    return this.createChatCompletion(conversationHistory, model);
  }
}

export default new OpenAIApiClient();
