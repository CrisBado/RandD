import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 200));
    expect(result.current).toBe('test');
  });

  it('should return the debounced value after the delay', () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook((props) => useDebounce(props, 200), {
      initialProps: 'test',
    });

    expect(result.current).toBe('test');

    rerender('new test');
    expect(result.current).toBe('test');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('new test');
  });

 it('should clear the timeout on unmount', () => {
  jest.useFakeTimers();
  const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
  const { unmount } = renderHook(() => useDebounce('test', 200));

  unmount();

  expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
});
});