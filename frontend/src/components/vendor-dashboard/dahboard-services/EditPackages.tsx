"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_PACKAGES_BY_OFFERING } from "@/graphql/queries";
import { UPDATE_PACKAGE, DELETE_PACKAGE, CREATE_PACKAGE } from "@/graphql/mutations";
import { useParams } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Package {
  id?: string;
  name: string;
  description: string;
  pricing: number;
  features: string[];
}

const EditPackages: React.FC = () => {
  const params = useParams();
  const offeringId = params.id as string;

  const { loading, error, data, refetch } = useQuery(FIND_PACKAGES_BY_OFFERING, {
    variables: { offeringId },
  });

  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesEnabled, setPackagesEnabled] = useState(false);

  const [updatePackage] = useMutation(UPDATE_PACKAGE);
  const [deletePackage] = useMutation(DELETE_PACKAGE);
  const [createPackage] = useMutation(CREATE_PACKAGE);

  useEffect(() => {
    if (data?.findPackagesByOffering) {
      setPackages(data.findPackagesByOffering);
      setPackagesEnabled(data.findPackagesByOffering.length > 0);
    }
  }, [data]);

  const handlePackageChange = (index: number, field: string, value: string | string[]) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setPackages(updatedPackages);
  };

  const handleFeatureChange = (packageIndex: number, featureIndex: number, value: string) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].features[featureIndex] = value;
    setPackages(updatedPackages);
  };

  const addFeature = (packageIndex: number) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].features.push("");
    setPackages(updatedPackages);
  };

  const handleSavePackage = async (pkg: Package) => {
    try {
      if (pkg.id) {
        await updatePackage({
          variables: {
            input: {
              id: pkg.id,
              name: pkg.name,
              description: pkg.description,
              pricing: parseFloat(pkg.pricing.toString()),
              features: pkg.features.filter(f => f.trim() !== "")
            }
          }
        });
        toast.success("Package updated successfully!");
      } else {
        await createPackage({
          variables: {
            input: {
              name: pkg.name,
              description: pkg.description,
              pricing: parseFloat(pkg.pricing.toString()),
              features: pkg.features.filter(f => f.trim() !== ""),
              offeringId: offeringId  // Add this line
            }
          }
        });
        toast.success("Package created successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save package");
      console.error(error);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    try {
      await deletePackage({
        variables: { id: packageId }
      });
      toast.success("Package deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete package");
      console.error(error);
    }
  };

  const addNewPackage = () => {
    setPackages([
      ...packages,
      { 
        name: `Package ${packages.length + 1}`, 
        description: "", 
        pricing: 0, 
        features: [""] 
      }
    ]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px]">Packages</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0" />

        <div className="flex items-center mb-6">
          <label className="font-body text-[16px] mr-4">Enable Packages</label>
          <Switch 
            checked={packagesEnabled} 
            onCheckedChange={() => setPackagesEnabled(!packagesEnabled)} 
          />
        </div>

        {packages.map((pkg, packageIndex) => (
          <div key={packageIndex} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-body text-[18px]">{pkg.name}</h3>
              {pkg.id && (
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => handleDeletePackage(pkg.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="mb-3">
              <label className="font-body text-[16px]">Name</label>
              <Input
                value={pkg.name}
                onChange={(e) => handlePackageChange(packageIndex, 'name', e.target.value)}
                className="font-body rounded-md mt-2"
              />
            </div>
            
            <div className="mb-3">
              <label className="font-body text-[16px]">Description</label>
              <Input
                value={pkg.description}
                onChange={(e) => handlePackageChange(packageIndex, 'description', e.target.value)}
                className="font-body rounded-md mt-2"
              />
            </div>
            
            <div className="mb-3">
              <label className="font-body text-[16px]">Price</label>
              <Input
                type="number"
                value={pkg.pricing}
                onChange={(e) => handlePackageChange(packageIndex, 'pricing', e.target.value)}
                className="font-body rounded-md mt-2"
              />
            </div>
            
            <div>
              <label className="font-body text-[16px]">Features</label>
              {pkg.features.map((feature, featureIndex) => (
                <Input
                  key={featureIndex}
                  value={feature}
                  onChange={(e) => handleFeatureChange(packageIndex, featureIndex, e.target.value)}
                  className="font-body rounded-md mt-2 mb-2"
                  placeholder="Enter feature"
                />
              ))}
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => addFeature(packageIndex)}
                className="mt-2 mr-2"
              >
                Add Feature
              </Button>
              <Button 
                type="button" 
                variant="default" 
                onClick={() => handleSavePackage(pkg)}
                className="mt-2"
              >
                {pkg.id ? 'Update Package' : 'Create Package'}
              </Button>
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={addNewPackage}
          className="mt-4 w-full"
        >
          Add New Package
        </Button>
      </div>
    </Fragment>
  );
};

export default EditPackages;