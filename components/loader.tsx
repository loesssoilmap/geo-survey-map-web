import { Loader2 } from 'lucide-react'

export const Loader: React.FC<{ size?: number }> = ({ size }) => (
	<div className="w-full flex justify-center">
		<Loader2 className="animate-spin" size={size} />
	</div>
)
