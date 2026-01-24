export function generateWhatsAppLink(productTitle: string, customMessage?: string): string {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6285189536359';

    const message = customMessage || `Halo, saya tertarik dengan *${productTitle}*.

Saya ingin tahu lebih lanjut tentang:
- Fitur lengkapnya
- Cara installasi
- Harga dan metode pembayaran

Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateWhatsAppLinkGeneral(): string {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6285189536359';
    const message = `Halo, saya ingin bertanya tentang produk source code yang tersedia. Mohon info lebih lanjut. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
