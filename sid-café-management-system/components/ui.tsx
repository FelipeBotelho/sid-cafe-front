import React, { ReactNode } from 'react';
import { XIcon } from './Icons';
import { SaleStatus } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-coffee-800 text-white hover:bg-coffee-900 focus:ring-coffee-800',
    secondary: 'bg-coffee-200 text-coffee-900 hover:bg-coffee-100 focus:ring-coffee-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    ghost: 'hover:bg-coffee-200 text-coffee-800 focus:ring-coffee-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className={`bg-coffee-100 rounded-lg shadow-xl w-full ${sizeClasses[size]} m-4`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-coffee-200">
          <h3 className="text-xl font-bold text-coffee-900">{title}</h3>
          <button onClick={onClose} className="text-coffee-500 hover:text-coffee-900">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="flex justify-end p-4 border-t border-coffee-200 space-x-2">{footer}</div>}
      </div>
    </div>
  );
};

interface BadgeProps {
  status: SaleStatus;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
  const statusClasses = {
    [SaleStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [SaleStatus.PREPARING]: 'bg-blue-100 text-blue-800',
    [SaleStatus.READY]: 'bg-purple-100 text-purple-800',
    [SaleStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [SaleStatus.CANCELLED]: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2.5 py-0.5 text-sm font-medium rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, id, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-coffee-800 mb-1">
      {label}
    </label>
    <input
      id={id}
      ref={ref}
      className="w-full px-3 py-2 border border-coffee-200 rounded-md shadow-sm focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
      {...props}
    />
  </div>
));

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, id, children, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-coffee-800 mb-1">
      {label}
    </label>
    <select
      id={id}
      ref={ref}
      className="w-full px-3 py-2 border border-coffee-200 rounded-md shadow-sm focus:outline-none focus:ring-coffee-500 focus:border-coffee-500 bg-white"
      {...props}
    >
      {children}
    </select>
  </div>
));