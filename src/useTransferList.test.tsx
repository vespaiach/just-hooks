import { renderHook, act } from '@testing-library/react-hooks';
import useTransferList from '../src/useTransferList';

test('should work normally with empty list', () => {
  const { result } = renderHook(() => useTransferList<number>([]));

  act(() => {
    result.current.transfer(1);
  });
  act(() => {
    result.current.withdraw(2);
  });

  expect(result.current.startList).toHaveLength(0);
  expect(result.current.endList).toHaveLength(0);
});

test('should work normally with an initial start list', () => {
  const { result } = renderHook(() => useTransferList(['a', 'b', 'c']));

  act(() => {
    result.current.transfer('a');
  });
  act(() => {
    result.current.transfer('c');
  });
  act(() => {
    result.current.withdraw('c');
  });

  expect(result.current.startList).toHaveLength(2);
  expect(result.current.startList).toEqual(expect.arrayContaining(['c', 'b']));
  expect(result.current.endList).toHaveLength(1);
  expect(result.current.endList).toEqual(expect.arrayContaining(['a']));
});

test('should work normally with an initial start and end list', () => {
  const { result } = renderHook(() => useTransferList(['a', 'b', 'c'], ['d']));

  act(() => {
    result.current.transfer('a');
  });
  act(() => {
    result.current.transfer('b');
  });
  act(() => {
    result.current.transfer('c');
  });
  act(() => {
    result.current.transfer('d');
  });
  act(() => {
    result.current.transfer('d');
  });

  expect(result.current.startList).toHaveLength(0);
  expect(result.current.endList).toHaveLength(4);
  expect(result.current.endList).toEqual(
    expect.arrayContaining(['a', 'b', 'd', 'c'])
  );
});

test('should work normally with an initial object-list', () => {
  const { result } = renderHook(() =>
    useTransferList<{ name: string; id: number }>([
      { name: 'a', id: 1 },
      { name: 'b', id: 2 },
      { name: 'c', id: 3 },
    ])
  );

  act(() => {
    result.current.transfer({ name: 'd', id: 4 });
  });

  expect(result.current.startList).toHaveLength(3);
  expect(result.current.endList).toHaveLength(0);

  act(() => {
    result.current.transfer({ name: 'a', id: 1 });
  });
  act(() => {
    result.current.transfer({ name: 'b', id: 2 });
  });

  expect(result.current.startList).toHaveLength(1);
  expect(result.current.startList).toEqual(
    expect.arrayContaining([{ name: 'c', id: 3 }])
  );
  expect(result.current.endList).toHaveLength(2);
  result.current.endList.forEach(it => {
    expect([1, 2].includes(it.id)).toBe(true);
  });
});

test('should not tranfer or withdraw unknown items', () => {
  const { result } = renderHook(() =>
    useTransferList<number>([1, 2, 3, 4], [3, 5])
  );

  act(() => {
    result.current.transfer(0);
  });
  act(() => {
    result.current.withdraw(6);
  });

  expect(result.current.startList).toHaveLength(4);
  expect(result.current.endList).toHaveLength(2);
});
