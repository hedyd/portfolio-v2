import { useCallback, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { useTypewriter } from "./useTypewriter";

import styles from "./Chat.module.scss";

export const Chat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const displayText = useTypewriter(text);

  const sendChatMessage = useCallback(async () => {
    if (!userInput) {
      return;
    }

    const body = {
      prompt: userInput,
    };

    const response = await fetch(
      "https://qgftcen1z6.execute-api.us-east-1.amazonaws.com/prod/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.body) {
      return;
    }

    const json = await response.json();
    const output =
      json?.output?.message?.content[0]?.text?.replace(/\n/g, "<br />") || "";

    setText(output);
    setUserInput("");
    setLoading(false);
  }, [userInput]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (!formJson?.chatText || typeof formJson.chatText !== "string") {
      return;
    }

    form.reset();
    setUserInput(formJson.chatText);
  }, []);

  useEffect(() => {
    sendChatMessage();
  }, [sendChatMessage]);

  return (
    <div className={styles.chat}>
      <div className={styles.output}>
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
        {loading && <Loading />}
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className={styles.controls}>
          <input
            className={styles.input}
            name="chatText"
            type="text"
            disabled={loading}
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </div>
        <div className={styles.disclaimer}>
          This chat uses{" "}
          <a
            href="https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html"
            target="_blank"
          >
            Amazon Nova Micro
          </a>
          , the cheapest AI model I could find. Please don't judge it too much,
          it's trying its hardest.
        </div>
      </form>
    </div>
  );
};
