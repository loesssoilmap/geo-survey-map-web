import React from 'react'

export const Box: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
	return <div className={`bg-white border-2 border-gray rounded-lg ${className}`}>{children}</div>
}
