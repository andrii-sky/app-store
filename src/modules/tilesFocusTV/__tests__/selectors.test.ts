import { focusedElement, focusedRow, focusedState, isFocused } from '../selectors';

const mockState = {
  tilesFocusTV: {
    focusedRow: 1,
    focusedElement: 2,
    isFocused: true,
  },
};

describe('selectors', () => {
  test('select focused row', () => {
    // When
    const result = focusedRow(mockState);

    // Then
    expect(result).toEqual(mockState.tilesFocusTV.focusedRow);
  });

  test('select focused element', () => {
    // When
    const result = focusedElement(mockState);

    // Then
    expect(result).toEqual(mockState.tilesFocusTV.focusedElement);
  });

  test('select is focused', () => {
    // When
    const result = isFocused(mockState);

    // Then
    expect(result).toEqual(mockState.tilesFocusTV.isFocused);
  });

  test('select focused state', () => {
    // When
    const result = focusedState(mockState);

    // Then
    expect(result).toEqual(mockState.tilesFocusTV);
  });
});
