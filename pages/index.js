import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Blah() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState([]);
	const socket = useSocket();

	useEffect(() => {
		if (socket) {
			socket.on("message.chat1", message => {
				setMessages(messages => [...messages, message]);
			});
		}
	}, [socket]);

	function submit(e) {
		e.preventDefault();

		socket &&
			socket.emit("message.chat1", {
				id: new Date().getTime(),
				value: message
			});
	}

	return (
		<div>
			<h1>ChatAPP ver0.0.0</h1>
			<form onSubmit={submit}>
				<input
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
				<button>submit</button>
			</form>
			<ul>
				{messages.map(msg => (
					<li key={msg.id}>{msg.value}</li>
				))}
			</ul>
		</div>
	);
}
