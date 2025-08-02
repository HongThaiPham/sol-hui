# Onboarding System

Hệ thống onboarding cho ứng dụng Sontine, giúp hướng dẫn người dùng lần đầu sử dụng app.

## Tính năng

### 1. Initial Onboarding Flow với Slide Animation

- **Màn hình chào mừng**: Giới thiệu về Sontine
- **Kết nối ví**: Hướng dẫn kết nối Solana wallet
- **Khám phá tính năng**: Giới thiệu các tính năng chính
- **Hoàn thành**: Kết thúc quá trình onboarding
- **Hiệu ứng trượt ngang**: Smooth slide animation giữa các bước

### 2. Interactive Dashboard Tour

- **Tour tương tác**: Hướng dẫn chi tiết các thành phần trên dashboard
- **Tooltip động**: Hiển thị tooltip với mũi tên chỉ vào các thành phần
- **Có thể bỏ qua**: Người dùng có thể skip tour bất kỳ lúc nào

### 3. Testing & Development Tools

- **Reset onboarding**: Nút reset trong Demo & Testing
- **Start dashboard tour**: Khởi động tour thủ công
- **Trạng thái hiển thị**: Xem trạng thái onboarding hiện tại

## Cấu trúc Files

```
components/onboarding/
├── onboarding-screen.tsx      # Màn hình onboarding chính
├── onboarding-slider.tsx      # Component slide animation
├── onboarding-wrapper.tsx     # Wrapper component
├── onboarding-tooltip.tsx     # Tooltip cho tour
├── dashboard-tour.tsx         # Tour cho dashboard
└── README.md                  # Tài liệu này

hooks/
├── use-onboarding.tsx         # Hook quản lý onboarding state
└── use-onboarding-tour.tsx    # Hook quản lý tour state
```

## Slide Animation

### Cách hoạt động:

1. **OnboardingSlider**: Component chính xử lý slide animation
2. **Horizontal Translation**: Sử dụng `translateX` để tạo hiệu ứng trượt ngang
3. **Smooth Transition**: Animation duration 400ms với easing tự nhiên
4. **Multiple Steps**: Hỗ trợ nhiều bước với width tính toán động

### Cấu trúc Animation:

```tsx
// Tính toán vị trí slide
const slideAnim = useRef(new Animated.Value(0)).current

// Animation khi chuyển step
Animated.timing(slideAnim, {
  toValue: -currentStep * width,
  duration: 400,
  useNativeDriver: true,
}).start()

// Container với transform
<Animated.View
  style={{
    flexDirection: 'row',
    width: width * steps.length,
    transform: [{ translateX: slideAnim }],
  }}
>
  {steps.map((step, index) => renderStep(step, index))}
</Animated.View>
```

## Cách sử dụng

### 1. Onboarding Provider

Đã được tích hợp vào `AppProviders`:

```tsx
<OnboardingProvider>{children}</OnboardingProvider>
```

### 2. Onboarding Wrapper

Đã được tích hợp vào `RootNavigator`:

```tsx
<OnboardingWrapper>
  <Stack>{/* App screens */}</Stack>
</OnboardingWrapper>
```

### 3. Dashboard Tour

Đã được tích hợp vào `DashboardFeature`:

```tsx
<DashboardTour />
```

### 4. Manual Controls

Sử dụng hooks để điều khiển:

```tsx
const { resetOnboarding, completeOnboarding } = useOnboarding()
const { startDashboardTour } = useDashboardTour()
```

## Testing

### Trong Demo & Testing Screen:

1. **Reset Onboarding**: Xóa trạng thái onboarding, khởi động lại app để xem flow
2. **Start Dashboard Tour**: Khởi động tour dashboard thủ công
3. **Status Display**: Xem trạng thái hiện tại (Completed/Not Completed)

### Quy trình test:

1. Mở Settings → Demo & Testing
2. Nhấn "Reset Onboarding"
3. Khởi động lại app
4. Onboarding flow sẽ hiển thị
5. Hoàn thành onboarding
6. Nhấn "Start Dashboard Tour" để test tour

## Customization

### Thêm bước onboarding mới:

Chỉnh sửa `totalSteps` và thêm step trong `OnboardingScreen`:

```tsx
const steps: OnboardingStep[] = [
  // Existing steps...
  {
    id: 4,
    title: 'New Step',
    description: 'Description for new step',
    icon: 'icon-name',
    iconColor: colors.primary,
  },
]
```

### Thêm tour mới:

Tạo tour steps và sử dụng `useOnboardingTour`:

```tsx
const customTourSteps: TourStep[] = [
  {
    id: 'step-1',
    title: 'Step Title',
    description: 'Step description',
    targetPosition: { x: 0, y: 0, width: 100, height: 50 },
  },
]

const { startTour } = useOnboardingTour()
startTour(customTourSteps)
```

## Storage

- **Onboarding state**: `AsyncStorage` key `'onboarding-completed'`
- **Tour state**: `AsyncStorage` key `'onboarding-tour-completed'`

## Dependencies

- `@react-native-async-storage/async-storage`: Lưu trữ trạng thái
- `react-native`: Core components
- `expo-router`: Navigation
- Custom UI components: `SontineButton`, `SontineCard`, etc.
