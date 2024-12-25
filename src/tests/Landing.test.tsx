import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, vi, expect } from 'vitest';
import Landing from '../pages/Landing.tsx';
import JsonExample from '../Json/JsonExample.json';

describe('Landing Component', () => {
   it('should render the initial list of items', () => {
      render(<Landing />);
      JsonExample.forEach((item) => {
         expect(screen.getByText(item.name)).toBeInTheDocument();
      });
   });
 
   it('when click item fruit should move a fruit item to the fruit list', () => {
      render(<Landing />);
   
      const appleButton = screen.getByText('Apple');
      fireEvent.click(appleButton);
      expect(screen.getByText('Apple', { selector: '.fruit button' })).toBeInTheDocument(); // Added to fruit list
   });
 
   it('when click item vegetable should move a vegetable item to the vegetable list', () => {
     render(<Landing />);
 
     const broccoliButton = screen.getByText('Broccoli');
     fireEvent.click(broccoliButton);
     expect(screen.getByText('Broccoli', { selector: '.vegetable button' })).toBeInTheDocument(); // Added to vegetable list
   });
 
   it('should move a fruit back to the main list after timeout', async () => {
     vi.useFakeTimers();
     render(<Landing />);
 
     const appleButton = screen.getByText('Apple');
     fireEvent.click(appleButton);
 
     // Simulate timeout
     vi.runAllTimers();
 
     expect(screen.getByText('Apple')).toBeInTheDocument(); // Back in the main list
     vi.useRealTimers();
   });
 
   it('should move a vegetable back to the main list after timeout', async () => {
     vi.useFakeTimers();
     render(<Landing />);
 
     const broccoliButton = screen.getByText('Broccoli');
     fireEvent.click(broccoliButton);
 
     // Simulate timeout
     vi.runAllTimers();
 
     expect(screen.getByText('Broccoli')).toBeInTheDocument(); // Back in the main list
     vi.useRealTimers();
   });
});