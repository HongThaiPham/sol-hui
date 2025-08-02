# Tontine Detail Screen Integration Guide

## Tổng quan
Màn hình `tontines/[id].tsx` đã được cập nhật để sử dụng hook `useGetGroup` từ `use-sontine-program.ts` để lấy dữ liệu thực từ blockchain thay vì dữ liệu mock.

## Các thay đổi chính

### 1. Hook `useGetGroup`
- Tạo custom hook `useGetGroup(groupAddress: string)` trong `use-sontine-program.ts`
- Hook này sử dụng React Query để fetch dữ liệu group từ Solana blockchain
- Tự động handle loading states và error handling

### 2. Màn hình Detail
- Import và sử dụng `useGetGroup` hook
- Xử lý loading và error states
- Hiển thị dữ liệu thực từ blockchain:
  - Group ID
  - Selection method (Random/Auction)
  - Contribution amount (với đúng decimals)
  - Max members và current members
  - Admin address

### 3. Dữ liệu hiển thị
- **Header**: Group ID và selection method
- **Quick Stats**: Total pool, rounds, members
- **Overview Tab**: Contract details với thông tin thực
- **Members Tab**: Admin info và member count
- **Activity Tab**: Basic group creation info

## Cách sử dụng

### Truyền Group Address
Màn hình nhận `id` từ URL params và sử dụng làm `groupAddress`:
```typescript
const { id } = useLocalSearchParams()
const groupAddress = Array.isArray(id) ? id[0] : id || ''
const { data: groupData, isLoading, error } = useGetGroup(groupAddress)
```

### Navigation
Để navigate đến màn hình detail:
```typescript
router.push(`/tontines/${groupAddress}`)
```

## Các tính năng cần phát triển thêm

1. **Member Management**: Lấy danh sách members thực tế
2. **Activity History**: Lấy transaction history
3. **Bidding Interface**: Implement bidding functionality cho auction groups
4. **Join Group**: Thêm chức năng join group
5. **Progress Tracking**: Tính toán progress thực tế dựa trên current cycle

## Testing
Để test integration:
1. Tạo một group mới từ create-group screen
2. Copy group address từ transaction
3. Navigate đến `/tontines/{groupAddress}`
4. Verify dữ liệu hiển thị đúng

## Error Handling
- Loading state khi đang fetch dữ liệu
- Error state khi không tìm thấy group hoặc có lỗi network
- Graceful fallback cho missing data
