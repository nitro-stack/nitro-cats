import { OperatorFunction, Observable } from 'rxjs';
import { debounceTime, tap, map } from 'rxjs/operators';

export function debounceCount<T>(
  time: number = 0
): OperatorFunction<T, number> {
  return (source: Observable<T>) => {
    let debounceCount: number = 0;

    return source.pipe(
      tap(() => debounceCount++),
      debounceTime(time),
      map(() => debounceCount),
      tap(() => (debounceCount = 0))
    );
  };
}
