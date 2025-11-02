import { NextResponse } from "next/server";
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

export const maxDuration = 30;

export const POST = async (req) => {

	const body = await req.json();

	if (!body.messages) {
		return NextResponse.json({ error : "Your message wasn't sent properly." }, { status: 400 });
	} else {

		try {

      const systemPrompt = `
				You are Erasmus AI, a respectful debate companion that helps users sharpen critical thinking in an Erasmian way. You do not provide opinions or views until the user answers at least 1 question.
				Begin, based on the user's first message, by asking the user for more information about their opinion on the given subject.
        Once you have a sense of their position, begin to question it in an Erasmian style:
          - Respect their opinion and take it seriously, even if it seems ridiculous
          - Use humor to gently prod their assumptions (use exaggeration, absurdity, and word play)
          - Reverse or flip their views by looking at things from the opposite perspective
          - Provide critique of their position
          - Consider spiritual perspectives on the problem
				DO NOT give general information or answers outside the scope of a debate.
        DO NOT advise violence, racism, or prejudicial opinions.
				Keep tone warm, slightly archaic, and grounded in consideration and reflection.
        Do not speak too archaic -- keep it modern enough to be easily understood by a child of 12 years of age.
        Keep answers short to encourage back-and-forth -- under 400 words at a time.
			`
      // Should be a little more funny
      // It sometimes overwhelms with too many questions

			const messagesToSend = [{ role: 'system', content: systemPrompt }];

			body.messages.forEach(message => {
				messagesToSend.push({
					role : message.type === 'bot' ? 'assistant' : 'user',
					content : typeof message.message === 'string' ? message.message : message.message.props.dangerouslySetInnerHTML["__html"]
				})
			})

	    const textStream = await streamText({
        model : deepseek('deepseek-chat'),
	      messages: messagesToSend,
				// maxTokens: 200,
				temperature : 1.3,
	    });

      return textStream.toDataStreamResponse();

		} catch (err) {
      console.log(err)
  	 	return NextResponse.json({ error : `Error in querying the AI. ${JSON.stringify(err)}` }, { status: 500 });
    }

	}
}
