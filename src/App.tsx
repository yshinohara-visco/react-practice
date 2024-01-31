import {
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";

//なんだかチャットアプリみたいな挙動をするもの
export const App = () => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [sended, setSended] = React.useState<boolean>(false);
    const refEnd = useRef<HTMLDivElement>(null);

    const deleteMessage = (index: number) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
    };

    const onSend = (message: string) => {
        setMessages([...messages, message]);
        setSended(true);
    };

    //sendした時だけ末尾へスクロール
    useEffect(() => {
        if (sended) {
            refEnd.current?.scrollIntoView({ behavior: "smooth" });
            setSended(false);
        }
    }, [sended]);

    return (
        <Stack bgcolor="darkblue" height="100vh">
            <Stack
                marginTop="auto"
                paddingX={2}
                spacing={2}
                alignItems="flex-end"
                overflow="auto"
            >
                {messages.map((message, index) => (
                    <MessageBox
                        key={index}
                        message={message}
                        onDelete={() => {
                            deleteMessage(index);
                        }}
                    />
                ))}
                <div ref={refEnd} />
            </Stack>

            <TextBox onSend={onSend} />
        </Stack>
    );
};

const MessageBox = (props: { message: string; onDelete: () => void }) => {
    const { message, onDelete } = props;

    return (
        <Stack
            direction={"row"}
            paddingLeft={2}
            paddingRight={1}
            paddingY={1}
            spacing={1}
            borderRadius="9999px"
            bgcolor="white"
            alignItems="center"
        >
            <Typography>{message}</Typography>
            <IconButton onClick={onDelete}>
                <Clear />
            </IconButton>
        </Stack>
    );
};

const TextBox = (props: { onSend: (message: string) => void }) => {
    const { onSend } = props;
    const [message, setMessage] = React.useState<string>("");

    return (
        <Stack direction="row" padding={2} bgcolor="lightblue">
            <TextField
                sx={{ flex: 1 }}
                inputProps={{ style: { backgroundColor: "white" } }}
                type="text"
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        onSend(message);
                        setMessage("");
                    }
                }}
            />
            <Button
                variant="contained"
                onClick={() => {
                    if (message.length === 0) return;
                    onSend(message);
                    setMessage("");
                }}
            >
                Send
            </Button>
        </Stack>
    );
};
