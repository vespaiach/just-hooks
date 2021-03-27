import { renderHook, act } from '@testing-library/react-hooks';
import useTransferList from '../src/useTransferList';

test('should work normally with empty list', () => {
  const { result } = renderHook(() => useTransferList<number>([]));

  act(() => {
    result.current.add(1);
  });
  act(() => {
    result.current.remove(2);
  });

  expect(result.current.start).toHaveLength(0);
  expect(result.current.end).toHaveLength(0);
});

test('should work normally with an initial list', () => {
  const { result } = renderHook(() => useTransferList<string>(['a', 'b', 'c']));

  act(() => {
    result.current.add('d');
    result.current.add('a');
    result.current.add('c');
    result.current.remove('c');
  });

  expect(result.current.start).toHaveLength(2);
  expect(result.current.start).toEqual(expect.arrayContaining(['a', 'b']));
  expect(result.current.end).toHaveLength(1);
  expect(result.current.end).toEqual(expect.arrayContaining(['c']));
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
    result.current.add({ name: 'd', id: 4 });
  });

  expect(result.current.start).toHaveLength(3);
  expect(result.current.end).toHaveLength(0);

  act(() => {
    result.current.add({ name: 'a', id: 1 });
  });
  act(() => {
    result.current.add({ name: 'b', id: 2 });
  });

  expect(result.current.start).toHaveLength(1);
  expect(result.current.start).toEqual(
    expect.arrayContaining([{ name: 'c', id: 3 }])
  );
  expect(result.current.end).toHaveLength(2);
  result.current.end.forEach(it => {
    expect([1, 2].includes(it.id)).toBe(true);
  });
});
