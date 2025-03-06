import { render, screen } from '@testing-library/react';
import Task from './Task';
import React from 'react';
import '@testing-library/jest-dom';

describe('Task Component', () => {
  const task = {
    title: 'Workout tasks',
    description: 'Arms, legs, and core workout',
  };

  test('should render task details correctly', () => {
    render(<Task {...task} />);

    expect(screen.getByText('Workout tasks')).toBeInTheDocument();

    expect(
      screen.getByText('Arms, legs, and core workout')
    ).toBeInTheDocument();
  });

  test('should render task details correctly', () => {
    render(<Task {...task} />);

    expect(screen.getByText('Workout tasks')).toBeInTheDocument();

    expect(
      screen.getByText('Arms, legs, and core workout')
    ).toBeInTheDocument();
  });
});
