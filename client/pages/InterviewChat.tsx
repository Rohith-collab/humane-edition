import ChatbotLayout from "@/components/ChatbotLayout";

export default function InterviewChat() {
  const welcomeMessage =
    "Good afternoon! I'm delighted to meet you. I'm the AI interviewer for today's Software Developer position interview. I'll be assessing your technical skills, experience, and communication abilities. This interview will take about 30 minutes, and I'll ask you various questions about your background, technical expertise, and problem-solving approach. Let's begin! Could you please tell me a bit about yourself and what drew you to apply for this Software Developer position?";

  const systemPrompt = `You are a professional AI interviewer conducting a job interview for a Software Developer position.

IMPORTANT INSTRUCTIONS:
- Ask one question at a time and wait for the candidate's response
- Keep your responses concise (1-2 sentences maximum)
- Be professional but friendly
- Ask follow-up questions based on their answers
- Cover technical skills, experience, problem-solving, and behavioral aspects
- Give constructive feedback when appropriate

GRAMMAR CORRECTION:
- If the candidate makes grammar mistakes, gently correct them in a professional way
- Format corrections like: "Great answer! Just a small note: you said 'I have work' but it should be 'I have worked' or 'I worked'. Now, let me ask..."
- Don't interrupt the flow of the interview - incorporate corrections naturally
- Focus on helping them communicate more clearly for professional settings
- Be encouraging and supportive with corrections

Continue the interview by asking relevant follow-up questions based on their responses.`;

  const backgroundImage =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <ChatbotLayout
      title="Job Interview Practice"
      welcomeMessage={welcomeMessage}
      systemPrompt={systemPrompt}
      backgroundImage={backgroundImage}
      theme="interview"
      practiceType="interview"
      avatarType="interviewer"
    />
  );
}
