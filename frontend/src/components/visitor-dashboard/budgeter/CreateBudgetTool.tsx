import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BUDGET_TOOL } from '@/graphql/mutations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import Image from 'next/image';

import { CreateBudgetToolProps } from '@/types/budgeterTypes';

const CreateBudgetTool: React.FC<CreateBudgetToolProps> = ({ visitorId }) => {
  const [totalBudget, setTotalBudget] = useState<string>('');

  const [createBudget, { loading }] = useMutation(CREATE_BUDGET_TOOL, {
    onCompleted: () => {
      toast.success('Budget created successfully!');
      // Reload the page after successful creation
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    const budgetValue = parseFloat(totalBudget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    createBudget({
      variables: {
        input: {
          totalBudget: budgetValue,
          visitorId: visitorId,
        },
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      <div className="text-sm text-gray-500 mb-4">
        Dashboard/Budgeter
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8">
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-4xl font-bold mb-4">
            Get started with adding your budget
          </h1>

          <p className="text-gray-700 mb-8">
            Plan your wedding expenses effectively and stay within budget.
          </p>

          <div className="space-y-6 max-w-md">
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Budget</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter your budget"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex items-center px-4 bg-gray-100 rounded-md">
                    LKR
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange hover:bg-coral-600 text-white py-6"
                  disabled={loading || !totalBudget}
                >
                  {loading ? 'Creating...' : 'Manage my budget'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src="/images/budgeter.png"
            alt="Budget Management Illustration"
            width={500}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetTool;