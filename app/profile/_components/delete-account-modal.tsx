import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DeleteAccountModalProps } from '@/types/types'

export function DeleteAccountModal({ isOpen, onClose, onConfirm, translations }: DeleteAccountModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{translations.title}</DialogTitle>
					<DialogDescription>{translations.description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						{translations.cancel}
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						{translations.confirm}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
