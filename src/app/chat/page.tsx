"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field"
import OpenAIService from "@/data/service/open_ai_service";
// import { userPrompt } from "@/presentation/components/input_field/index"

export default function Home() {
    const router = useRouter()

    const [userPrompt, setUserPrompt] = useState("")
    const [chatList, setChatList] = useState<string[]>([])
    // const [input, setInput] = useState("")
    // const [json, setJson] = useState("")

    // const [response, setResponse] = useState("")

    const addMessage = (message) => {
        const side = chatList.length % 2 === 0 ? "left" : "right";
        const avatarPath = side === "left" ? "/judge.png" : "/user.png"; // 왼쪽과 오른쪽에 따른 이미지 경로 설정
        
        const newMessage = {
          message: message,
          side: side,
          avatar: avatarPath // 사용자 프로필 이미지 경로
        };
        setChatList([...chatList, newMessage]);
        //setUserPrompt(""); // 입력 필드 클리어
      };
      

    const open_ai_service = new OpenAIService();

    var response: string

    // const llmResopnse = () => {
    //     res = await open_ai_service.getResponse(
    //         userPrompt,
    //         chatList
    //     );
    //     setResponse(res)
    // }

    const systemPrompt = "You are a judge. You will be given an explanation of a conflict from the couple.\n"
    + "Carefully analyze the explanation and reform it in a refined sentence.\n"
    + "Output format should be as following.\n"
    + "Case name: (a title summarizing the incident)\n"
    + "Summarization: (an explanation that will be passed to the opponent.)\n"
    + "Use Korean only. 한국어만 사용하세요.";


    // if (chatList.length < 1 || chatList == undefined){
    //     setChatList([systemPrompt])
    // }

    const llmResponse = (userPrompt: string) => {

        setChatList([...chatList, userPrompt])
        // setJson(JSON.stringify(chatList);


    }

    // const llmResponse = (userPrompt: string) => {
    //     response = await openai.chat.completions.create({
    //         model: 'gpt-3.5-turbo',
    //         messages: [
    //           { role: 'system', content: systemPrompt },
    //           { role: 'user', content: userPrompt },
    //         ],
    //       });
    //       answer = response.choices[0].message.content;
    // }


    // chatList.push({role: 'assistant', content: llmResponse})

    // chatList.push({role: 'assistant', content: llmResponse})


    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div>
                    System Prompt:<br/>
                    { systemPrompt }
                    <br/><br/>
                    User Prompt:<br/>
                    { userPrompt }
                    <br/><br/><br/><br/>
                    <ul className="chat-container">
                        {chatList.map((item, index) => (
                            <div key={index} className={`message-container ${item.side}`}>
                            <img src={item.avatar} alt={`${item.username}'s avatar`} className="avatar" />
                            <li key={index} className={`chat-item ${item.side}`}>
                            <div>
                                <strong>{item.username}</strong> {item.message}
                            </div>
                            </li>
                            </div>
                        ))}
                    </ul>
                    <br/><br/>
                        
                </div>
                <div className="input-container">
                    <textarea
                        className="input-field"
                        placeholder="상황을 입력하세요."
                        onChange={(e) => setUserPrompt(e.target.value)}
                        required={false}
                        value={userPrompt}
                    />
                    <Button type="mini" text="입력" onClick={() => addMessage(userPrompt)} />
                </div>
            </header>
        </div>
    </main>
    );
}
