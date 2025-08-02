# CreateTontineScreen - Redesigned Form Guide

## Overview
Màn hình CreateTontineScreen đã được thiết kế lại hoàn toàn để tích hợp với hook `useSontineProgram` và gọi hàm `createGroup` để tạo tontine group trên Solana blockchain.

## Key Features

### 1. Form Fields
- **Contribution Amount (USDC)**: Số tiền đóng góp mỗi round (tính bằng USDC)
- **Maximum Members**: Số thành viên tối đa (2-255)
- **Minimum Members to Start**: Số thành viên tối thiểu để bắt đầu (2 đến max members)

### 2. Selection Method Options
- **Random**: Chọn người nhận ngẫu nhiên mỗi round
- **Fixed Order**: Chọn theo thứ tự cố định
- **Auction**: Chọn thông qua đấu giá (có cấu hình bổ sung)

#### Auction Configuration (khi chọn Auction)
- **Auction Duration**: Thời gian đấu giá (giây)
- **Min Bid Increment**: Mức tăng giá tối thiểu (basis points)
- **Max Interest Rate**: Lãi suất tối đa (basis points)

### 3. Cycle Duration Options
- **Weekly**: Mỗi tuần một round
- **Monthly**: Mỗi tháng một round  
- **Custom**: Tự định nghĩa số ngày

### 4. Summary Section
Hiển thị tóm tắt:
- Total Pool Value (tổng giá trị pool)
- Selection Method đã chọn
- Cycle Duration đã chọn

## Technical Implementation

### Data Types
```typescript
type AuctionConfig = {
  auctionDuration: number
  minBidIncrement: number
  maxInterestRate: number
}
```

### Helper Functions
- `createSelectionMethod()`: Tạo SelectionMethod enum
- `createCycleDuration()`: Tạo CycleDuration enum với custom duration

### Form Validation
- Contribution amount > 0
- Max members: 2-255
- Min members: 2 đến max members
- Custom duration >= 1 day
- Auction config validation (khi chọn auction)

### Integration with useSontineProgram
```typescript
const { createGroup } = useSontineProgram()

await createGroup.mutateAsync({
  selectionMethod: createSelectionMethod(formData.selectionMethod),
  maxMembers: parseInt(formData.maxMembers),
  contributionAmount: contributionAmountInLamports, // Convert USDC to micro-USDC
  cycleDuration,
  minMembersToStart: parseInt(formData.minMembersToStart),
  auctionConfig,
})
```

## UI Components Used
- `SontineInput`: Text inputs với validation
- `SontineButton`: Option selection buttons
- `SontineActionButton`: Submit button với loading state
- `SontineCard`: Section containers
- `AppText`: Typography

## Styling
- Sử dụng `getStyles()` function với theme optimization
- `useMemo` để optimize performance
- Responsive layout với proper spacing

## Error Handling
- Form validation với error messages
- Try-catch cho blockchain operations
- User-friendly error alerts

## Currency Note
App sử dụng USDC thay vì SOL cho tất cả giao dịch, đúng theo yêu cầu của Sontine app.
