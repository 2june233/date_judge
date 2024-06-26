import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import Groq from "groq-sdk";

export default class GroqLlama3Service {
  async getResponse3(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<CodeResponse> {

    //const groq = new Groq();
    const groq = new Groq({apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true});

    try {
      var response = await groq.chat.completions.create({  // const response = await openai.chat.completions.create
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        "model": "mixtral-8x7b-32768",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
      });
      var answer = response.choices[0].message.content;
      console.log('Mixtral called')
      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 quoteList를 받아왔습니다.",
        answer
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "quoteList를 받아오는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }
}