import prisma from '@/lib/db';

export const favoritesRepository = {
    async getByDevice(deviceId: string) {
        return prisma.favorite.findMany({
            where: { deviceId },
            include: { listing: true },
            orderBy: { createdAt: 'desc' },
        });
    },

    async toggle(deviceId: string, listingId: string) {
        const existing = await prisma.favorite.findUnique({
            where: {
                deviceId_listingId: { deviceId, listingId },
            },
        });

        if (existing) {
            await prisma.favorite.delete({
                where: { id: existing.id },
            });
            return { added: false };
        } else {
            await prisma.favorite.create({
                data: { deviceId, listingId },
            });
            return { added: true };
        }
    },

    async isFavorite(deviceId: string, listingId: string) {
        const fav = await prisma.favorite.findUnique({
            where: {
                deviceId_listingId: { deviceId, listingId },
            },
        });
        return !!fav;
    },

    async remove(deviceId: string, listingId: string) {
        return prisma.favorite.deleteMany({
            where: { deviceId, listingId },
        });
    },

    async getFavoriteIds(deviceId: string) {
        const favs = await prisma.favorite.findMany({
            where: { deviceId },
            select: { listingId: true },
        });
        return favs.map(f => f.listingId);
    },
};
