/**
 * AI Chatbot Specialist — rounded speech bubble with three typing dots
 * and a small neural node hanging off the corner as the antenna/tail.
 * The neural node hints at the model behind the conversation.
 */
type Props = { size?: number; className?: string };

export default function ChatbotIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Speech bubble */}
      <path
        d="M4 5 H18 A2 2 0 0 1 20 7 V14 A2 2 0 0 1 18 16 H10 L6 20 V16 H4 A2 2 0 0 1 2 14 V7 A2 2 0 0 1 4 5 Z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      {/* Ellipsis dots */}
      <circle cx={7.5} cy={10.5} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={11} cy={10.5} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={14.5} cy={10.5} r={0.8} fill="currentColor" stroke="none" />
      {/* Neural node + connector */}
      <path d="M19 15.5 L21 18" />
      <circle cx={21.5} cy={18.5} r={1.2} />
      <path d="M20.6 17.8 L22.4 19.2" />
    </svg>
  );
}
