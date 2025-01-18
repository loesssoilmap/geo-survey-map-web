import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslations } from '@/hooks/useTranslations'
import { DeleteAccountModalProps } from '@/types/types'

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
	const { translations } = useTranslations()

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{translations.userProfile.deleteAccountPopup.firstConfirmation.title}</DialogTitle>
					<DialogDescription>{translations.userProfile.deleteAccountPopup.firstConfirmation.description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						{translations.userProfile.deleteAccountPopup.cancel}
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						{translations.userProfile.deleteAccountPopup.button}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
