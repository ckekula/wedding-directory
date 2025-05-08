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
  offeringId?: string;
  visible: boolean;
}

const EditPackages: React.FC = () => {
  const params = useParams();
  const offeringId = params.id as string;

  const { loading, error, data } = useQuery(FIND_PACKAGES_BY_OFFERING, {
    variables: { offeringId },
  });

  const [packages, setPackages] = useState<Package[]>([]);

  const [createPackage] = useMutation(CREATE_PACKAGE);
  const [updatePackage] = useMutation(UPDATE_PACKAGE);
  const [deletePackage] = useMutation(DELETE_PACKAGE);

  useEffect(() => {
    if (data?.findPackagesByOffering) {
      setPackages(data.findPackagesByOffering);
    }
  }, [data]);

  const handlePackageChange = (index: number, field: keyof Package, value: string) => {
    const updatedPackages = [...packages];
    if (field === 'pricing') {
      updatedPackages[index] = {
        ...updatedPackages[index],
        [field]: parseFloat(value) || 0
      };
    } else if (field === 'features') {
      // Skip if features array is passed - handle separately in handleFeatureChange
      return;
    } else {
      updatedPackages[index] = {
        ...updatedPackages[index],
        [field]: value
      };
    }
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

  const handleVisibilityChange = (packageIndex: number, visible: boolean) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex] = {
      ...updatedPackages[packageIndex],
      visible
    };
    setPackages(updatedPackages);
  };

  const handleSavePackage = async (pkg: Package) => {
    try {
      const validFeatures = pkg.features.filter(f => f.trim() !== "");
      const numericPrice = parseFloat(pkg.pricing.toString());

      if (isNaN(numericPrice)) {
        toast.error("Please enter a valid price");
        return;
      }

      if (!pkg.id) {
        // Create new package
        const result = await createPackage({
          variables: {
            input: {
              name: pkg.name.trim(),
              description: pkg.description.trim(),
              pricing: numericPrice,
              features: validFeatures,
              visible: pkg.visible
            },
            offeringId
          }
        });

        if (result.data?.createPackage) {
          toast.success("Package created successfully!");
          // Update the local state with the new package
          const updatedPackages = packages.map(p => 
            p === pkg ? { ...result.data.createPackage } : p
          );
          setPackages(updatedPackages);
        }
      } else {
        const result = await updatePackage({
          variables: {
            input: {
              id: pkg.id,
              name: pkg.name.trim(),
              description: pkg.description.trim(),
              pricing: numericPrice,
              features: validFeatures,
              visible: pkg.visible
            }
          }
        });

        if (result.data?.updatePackage) {
          toast.success("Package updated successfully!");
          // Update the local state with the updated package
          const updatedPackages = packages.map(p => 
            p.id === pkg.id ? { ...result.data.updatePackage } : p
          );
          setPackages(updatedPackages);
        }
      }
    } catch (error: unknown) {
      console.error("Full error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unknown error occurred";
      toast.error(`Failed to save package: ${errorMessage}`);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    try {
      const result = await deletePackage({
        variables: { id: packageId },
        update(cache) {
          // Remove the deleted package from Apollo cache
          const normalizedId = cache.identify({ id: packageId, __typename: 'Package' });
          cache.evict({ id: normalizedId });
          cache.gc();
        }
      });

      if (result.data?.deletePackage) {
        toast.success("Package deleted successfully!");
        // Remove the deleted package from local state
        setPackages(packages.filter(p => p.id !== packageId));
      }
    } catch (error: unknown) {
      console.error("Delete error:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "An unknown error occurred";
      toast.error(`Failed to delete package: ${errorMessage}`);
    }
  };

  const addNewPackage = () => {
    setPackages([
      ...packages,
      { 
        name: `Package ${packages.length + 1}`, 
        description: "", 
        pricing: 0, 
        features: [""],
        offeringId,
        visible: false
      }
    ]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        {/* Modified header section */}
        <div className="flex justify-between items-center">
          <h2 className="font-title text-[30px]">Packages</h2>
          <Button 
            type="button" 
            onClick={addNewPackage}
            className="bg-orange hover:bg-orange-600 text-white"
          >
            Add New Package
          </Button>
        </div>
        <hr className="w-full h-px my-4 bg-gray-500 border-1" />

        {packages.map((pkg, packageIndex) => (
          <div key={packageIndex} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-body text-[18px]">{pkg.name}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="font-body text-[14px]">Visible</label>
                  <Switch 
                    checked={pkg.visible}
                    onCheckedChange={(checked) => handleVisibilityChange(packageIndex, checked)}
                  />
                </div>
                {pkg.id && (
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => {
                      handleDeletePackage(pkg.id!);                    
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
                step="0.01" // Allow decimal values
                min="0"     // Prevent negative values
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
                variant="outline" 
                onClick={() => addFeature(packageIndex)}
                className="mt-2 mr-2 text-orange hover:text-orange-600 hover:bg-orange-50 border-orange"
              >
                Add Feature
              </Button>
              <Button 
                type="button" 
                onClick={() => handleSavePackage(pkg)}
                className="mt-2 bg-orange hover:bg-orange-600 text-white"
              >
                {pkg.id ? 'Update Package' : 'Create Package'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default EditPackages;