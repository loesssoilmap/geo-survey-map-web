export const NoDataFallback: React.FC<{ text: string }> = ({ text }) => (
	<div className="flex items-center justify-center h-12 w-full bg-white rounded-lg border">
		<p>{text}</p>
	</div>
)
