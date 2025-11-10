import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

describe('useIntersectionObserver', () => {
  let observerCallback: IntersectionObserverCallback;
  let mockObserve: jest.MockedFunction<(target: Element) => void>;
  let mockUnobserve: jest.MockedFunction<(target: Element) => void>;
  let mockDisconnect: jest.MockedFunction<() => void>;
  
  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();
    
    // Mock IntersectionObserver with proper typing
    global.IntersectionObserver = class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
      takeRecords = jest.fn(() => [] as IntersectionObserverEntry[]);
    };
  });

  it('should return a ref and isIntersecting state', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    
    expect(result.current[0]).toBeDefined();
    expect(result.current[1]).toBe(false);
  });

  it('should observe the element when ref is set', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    
    // Mock element
    const mockElement = document.createElement('div');
    result.current[0].current = mockElement;
    
    // Re-render to trigger the effect
    rerender();
    
    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });

  it('should update isIntersecting when element intersects', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    
    // Set the ref to trigger observer creation
    const mockElement = document.createElement('div');
    result.current[0].current = mockElement;
    
    // Re-render to trigger the effect and create the observer
    rerender();
    
    // Now observerCallback should be defined
    expect(observerCallback).toBeDefined();
    
    // Trigger intersection with act wrapper
    act(() => {
      observerCallback([{ 
        isIntersecting: true,
        intersectionRatio: 1,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: mockElement,
        time: 0
      }], {} as IntersectionObserver);
    });
    
    // Re-render to get the updated state
    rerender();
    
    expect(result.current[1]).toBe(true);
  });
});