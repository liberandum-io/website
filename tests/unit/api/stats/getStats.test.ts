import getStats from '@/app/api/stats/getStats';
import prisma from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  animal: {
    count: jest.fn(),
  },
  animalMedia: {
    count: jest.fn(),
  },
  partner: {
    count: jest.fn(),
  },
  user: {
    count: jest.fn(),
  },
}));

describe('getStats', () => {
  // Test case for successful execution
  it('should return the correct stats', async () => {
    // Mock the count methods of prisma to return specific values
    (prisma.animal.count as jest.MockedFunction<typeof prisma.animal.count>).mockResolvedValueOnce(10);
    (prisma.animalMedia.count as jest.MockedFunction<typeof prisma.animalMedia.count>).mockResolvedValueOnce(5);
    (prisma.partner.count as jest.MockedFunction<typeof prisma.partner.count>).mockResolvedValueOnce(3);
    (prisma.user.count as jest.MockedFunction<typeof prisma.user.count>).mockResolvedValueOnce(20);

    const result = await getStats();

    // Verify that the count methods were called
    expect(prisma.animal.count).toHaveBeenCalledTimes(1);
    expect(prisma.animalMedia.count).toHaveBeenCalledTimes(1);
    expect(prisma.partner.count).toHaveBeenCalledTimes(1);
    expect(prisma.user.count).toHaveBeenCalledTimes(1);

    // And the values are correct
    expect(result.animalCount).toBe(10);
    expect(result.mediaCount).toBe(5);
    expect(result.partnerCount).toBe(3);
    expect(result.usersCount).toBe(20);
  });
});