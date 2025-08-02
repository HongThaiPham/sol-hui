# Members Tab Integration Guide

## Tổng quan
Tab Members đã được tách ra thành component riêng `MembersTab.tsx` và sử dụng hook `useGroupMembers` để lấy danh sách thành viên thực từ blockchain.

## Cấu trúc Component

### MembersTab Component
**File**: `components/tontine/MembersTab.tsx`

**Props**:
```typescript
interface MembersTabProps {
  groupAddress: string
}
```

**Features**:
- Hiển thị thông tin Group Admin với icon crown
- Lấy và hiển thị danh sách members từ blockchain
- Loading và error states
- Empty state khi chưa có members

## Hook useGroupMembers

**File**: `hooks/use-sontine-porgram.ts`

**Signature**:
```typescript
useGroupMembers(groupAddress: string, limit: number = 10, offset: number = 0)
```

**Functionality**:
- Sử dụng `sontineProgram.account.member.all()` với filter
- Filter theo groupAddress sử dụng `memcmp`
- Trả về array của member accounts
- Tự động handle loading và error states

## Cách sử dụng

### Trong TontineDetailScreen
```typescript
import { MembersTab } from '@/components/tontine/MembersTab'

// Trong component
{activeTab === 'members' && <MembersTab groupAddress={groupAddress} />}
```

### Standalone Usage
```typescript
import { MembersTab } from '@/components/tontine/MembersTab'

function MyComponent() {
  const groupAddress = "your-group-address-here"
  
  return <MembersTab groupAddress={groupAddress} />
}
```

## UI Components

### Group Admin Card
- Hiển thị crown icon
- Admin public key (full address)
- Role indicator

### Members List
- Member counter
- Member cards với:
  - Member index (#1, #2, etc.)
  - Public key (full address)
  - Wallet address (truncated)
  - Active status icon

### States
- **Loading**: "Loading members..." message
- **Error**: Error message với details
- **Empty**: "No Members Yet" với group stats
- **Success**: List of member cards

## Data Structure

### Member Account
```typescript
{
  publicKey: PublicKey,
  account: {
    wallet: PublicKey,
    // other member fields...
  }
}
```

## Styling Features
- Consistent với design system
- Responsive layout
- Proper spacing và colors
- Monospace font cho addresses
- Icon integration
- Card-based layout

## Testing

### Test với real data
1. Tạo group mới
2. Có members join group
3. Navigate đến detail screen
4. Switch to Members tab
5. Verify members hiển thị đúng

### Test edge cases
- Empty group (no members)
- Loading state
- Error state (invalid group address)
- Network errors

## Future Enhancements

1. **Pagination**: Implement limit/offset cho large groups
2. **Member Details**: Click vào member để xem chi tiết
3. **Member Actions**: Kick member, promote to admin
4. **Search/Filter**: Tìm kiếm members
5. **Member Stats**: Contribution history, reputation
6. **Real-time Updates**: WebSocket cho live member updates

## Performance Considerations
- React Query caching
- Efficient re-renders
- Proper key props cho lists
- Lazy loading cho large member lists
